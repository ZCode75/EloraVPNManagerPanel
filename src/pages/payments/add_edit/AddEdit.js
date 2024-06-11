import { Fragment, memo, useEffect, useState } from 'react';
import { Box, DialogActions, Divider, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import { getDayPersian, getExpireTime, convertByteToInt, formValues } from 'utils';
import Button from 'components/button';
import UserSelect from 'pages/components/select/users';
import useUsers from 'hooks/useUsers';
import Select from 'components/formik/select';
import UserInfo from 'pages/components/user_info';
import useOrders from 'hooks/useOrders';
import GLOBAL from 'components/variables';
import Autocomplete from 'components/formik/autocomplete';
import CheckBox from 'components/formik/checkbox';

const validationSchema = yup.object({
  user_id: yup.number().required()
});

const initialForm = {
  user_id: 0,
  order_id: 0,
  total: 0,
  method: 'MONEY_ORDER',
  status: 'PAID',
  is_negative: false
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;

  const [postDataLoading, setPostDataLoading] = useState(false);

  const { getUser, user, isLoading: isLoadingUser, setUser } = useUsers();
  const { orders, isLoading: isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    if (initial?.user_id) getOrders({ user_id: initial.user_id || null });
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.payments, values)
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        createRow && createRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const handleEdit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .put(`${api.payments}/${initial?.id}`, formValues(initialForm, values))
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        editRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };
  const condition = ['CANCELED', 'COMPLETED'];

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initial || initialForm}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          initial.id ? handleEdit(values) : handleCreate(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {user && (
              <UserInfo user={user} isLoading={isLoadingUser}>
                {/* {user.accounts && (
                  <>
                    <Typography variant="h6" component={'div'}>
                      Day:
                      {user.accounts.find((i) => i.id === values.account_id).id}
                    </Typography>
                    <Typography variant="h6" component={'div'}>
                      Usage:
                      {convertByteToInt(
                        user.accounts.find((i) => i.id === values.account_id).used_traffic
                      )}
                    </Typography>
                    <Typography variant="h6" component={'div'}>
                      Email:
                      {user.accounts.find((i) => i.id === values.account_id).email}
                    </Typography>
                  </>
                )} */}
              </UserInfo>
            )}
            <Grid container spacing={2} rowSpacing={2}>
              {!user && (
                <Grid item xs={12}>
                  <UserSelect
                    name="user_id"
                    label="Users"
                    onChange={(user) => {
                      if (user) getOrders({ user_id: user.id });
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Autocomplete
                  getOptionLabel={(option) =>
                    `${convertByteToInt(option.data_limit).toFixed(1)} Gb - ${getDayPersian(
                      getExpireTime(option.duration)
                    )}`
                  }
                  renderOption={(props, { id, data_limit, duration }) => (
                    <Fragment key={id}>
                      <li {...props}>
                        <Box>
                          ID: {id} Usage: {convertByteToInt(data_limit).toFixed(1)} GB{' '}
                          {getDayPersian(getExpireTime(duration))}
                        </Box>
                      </li>
                      <Divider />
                    </Fragment>
                  )}
                  label={'Order'}
                  name="order_id"
                  options={orders}
                  isLoading={isLoadingOrders}
                  onChange={(order) => {
                    if (!order && initial.id) {
                      setUser(null);
                      return;
                    }
                    setFieldValue('status', order.status);
                    setFieldValue('total', order.total);
                    setFieldValue('user_id', order.user_id);
                    setUser(order.user);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  label={'Status'}
                  name="status"
                  options={GLOBAL.statusPayment}
                  disabled={!!values.order_id || (initial.id && condition.includes(values.status))}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label={'Methode'}
                  name="method"
                  options={GLOBAL.methods}
                  disabled={initial.id && condition.includes(values.status)}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  label={'Total'}
                  price
                  name="total"
                  disabled={!!values.order_id || (initial.id && condition.includes(values.status))}
                />
              </Grid>
              <Grid item xs={2}>
                <CheckBox labelPlacement="top" name="is_negative" legend={'Is Negative'} />
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                autoFocus
                variant={'outlined'}
                type="submit"
                isLoading={postDataLoading}
                color="primary"
              >
                Submit
              </Button>
              <Button
                variant={'outlined'}
                color="error"
                onClick={() => refrence.current.changeStatus()}
              >
                Cancell
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default memo(AddEdit);
