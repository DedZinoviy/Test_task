import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Comment } from '../../types/Comment';
import { ThemeProvider } from '@mui/material';
import Theme from '../../types/Theme.ts';  // Импорт темы

interface TableViewProps {
  search: string;
  filterEmail: string;
  filterBody: string;
}

/** Компонент табличного отображения */
const TableView: React.FC<TableViewProps> = ({ search, filterEmail, filterBody }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const comments: Comment[] = useSelector((state: RootState) => state.comments.data);

  // Фильтрация данных по полям: name, email и body
  const filteredData = comments.filter((item) =>
    item.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
    item.body.toLowerCase().includes(filterBody.toLowerCase()) &&
    item.name.toLowerCase().includes(search.toLowerCase()) // Фильтрация по поисковому запросу
  );

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={Theme}> {/* Используем ThemeProvider для темы */}
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Таблица
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><Typography variant="h6">ID</Typography></TableCell>
                <TableCell><Typography variant="h6">Название</Typography></TableCell>
                <TableCell><Typography variant="h6">Email</Typography></TableCell>
                <TableCell><Typography variant="h6">Сообщение</Typography></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Link to={`/comment/${row.id}`} style={{ textDecoration: 'none' }}>
                      <Typography variant="body1" color="primary">{row.name}</Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.body}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </ThemeProvider>
  );
};

export default TableView;
