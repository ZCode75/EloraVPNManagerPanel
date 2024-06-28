const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name',
    width: 100
  },
  {
    headerName: 'Service Title',
    field: 'service_title',
    width: 100
  },
  {
    headerName: 'Usage',
    field: JSON.stringify(['used_traffic', 'used_traffic_percent', 'data_limit']),
    renderCell: 'progress',
    width: 120
  },
  {
    headerName: 'Usage',
    field: 'expired_at',
    renderCell: 'progressDay',
    width: 120
  },
  {
    headerName: 'Status',
    field: 'enable',
    renderCell: 'status',
    width: 1
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 100
  }
];

export default columns;
