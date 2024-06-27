const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name',
    width: 100
  },
  {
    headerName: 'Service Title',
    field: 'service_title'
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
    width: 100
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
    renderCell: 'date'
  }
];

export default columns;
