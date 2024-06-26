const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    renderCell: 'complexField',
    width: 150
  },
  {
    headerName: 'Account Email',
    field: 'account.email',
    renderCell: 'complexField',
    width: 150
  },
  {
    headerName: 'Total',
    field: 'total',
    renderCell: 'total',
    width: 150
  },
  {
    headerName: 'Status',
    field: 'status',
    renderCell: 'orderStatus',
    width: 150
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 150
  }
];

export default columns;
