import { Add } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/button';
import CustomDrawer from 'components/drawer';
import SelectBadge from 'components/formik/badge';
import Grid from 'components/grid';
import CustomGrid from 'components/grid_data';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import GLOBAL from 'components/variables';
import { Form, Formik } from 'formik';
import { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertByteToInt } from 'utils';
import columns from './columns';
import Select from 'components/formik/select';

const pageName = 'Monitoring';

const Monitoring = () => {
  const navigate = useNavigate();

  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();
  const createAccountRef = useRef();

  const [data] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleAlert = ({ row }, nameRef) => {
    setItem(row);
    nameRef.current.open();
  };

  const handleEdit = ({ row }) => {
    createRef.current.changeStatus();
    setItem({ ...row, data_limit: convertByteToInt(row.data_limit) });
  };

  const createRow = (data) => {
    gridRef.current.createRow(data);
    setItem({});
  };

  const editRow = (data) => {
    gridRef.current.editRow(data);
    setItem({});
  };

  const handleDelete = () => {
    setIsLoadingDelete(true);
    HttpService()
      .delete(`${api.services}/${item?.id}`)
      .then(() => {
        gridRef.current.deleteRow(item);
        deleteRef.current.close();
      })
      .catch((err) => {
        Http.error(err);
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  };

  return (
    <>
      <Box>
        <Typography variant="h4" gutterBottom>
          {pageName}
        </Typography>
        <Button
          sx={{ mb: 1 }}
          onClick={() => {
            createRef.current.changeStatus();
            setItem('');
          }}
          icon={<Add />}
        >
          Create
        </Button>
        <CustomGrid
          name="services"
          refrence={gridRef}
          searchChildren={
            <Formik
              initialValues={{
                sni_id: 1,
                domain_id: 1
              }}
            >
              {() => (
                <Form>
                  <Box display={'flex'} gap={1}>
                    <Select
                      label={'SNI'}
                      size="small"
                      options={[{ id: 1, name: 'All' }]}
                      name={'sni_id'}
                    />
                    <Select
                      label={'Domain'}
                      size="small"
                      options={[{ id: 1, name: 'All' }]}
                      name={'domain_id'}
                    />
                  </Box>
                </Form>
              )}
            </Formik>
          }
          data={[
            {
              id: 1,
              name: 'Germany AT1',
              ping: '253ms'
            }
          ]}
          columns={columns}
          rowActions={[
            {
              onClick: (data) => handleAlert(data, deleteRef),
              icon: 'delete',
              color: 'red',
              name: 'Delete'
            },
            {
              onClick: handleEdit,
              icon: 'edit',
              color: 'primary',
              name: 'Edit'
            }
          ]}
          paginateServ={true}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'price', name: 'Price' },
            { id: 'duration', name: 'Duration' },
            { id: 'data_limit', name: 'Data Limit' }
          ]}
          defaultSort={{ value: 'created', ASC: false }}
        />
      </Box>
    </>
  );
};

export default memo(Monitoring);
