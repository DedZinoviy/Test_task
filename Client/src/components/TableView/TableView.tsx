import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Typography,
  Box,
} from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { Comment } from '../../types/Comment';
import { useAppSelector } from '../../redux';

/** Компонент табличного отображения */
const TableView: React.FC = () => {
  const [searchParams] = useSearchParams();
  // Извлечение параметры поиска и фильтров из URL
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const comments: Comment[] = useAppSelector(
    (state) => state.comments.data
  );

  // Фильтрация данных по полям: name, email и body
  const filteredData = comments.filter((item) => {
    const search = searchParams.get('search') || '';
    const filterEmail = searchParams.get('filterEmail') || '';
    const filterBody = searchParams.get('filterBody') || '';
    return (
      item.email.toLowerCase().includes(filterEmail.toLowerCase()) &&
      item.body.toLowerCase().includes(filterBody.toLowerCase()) &&
      item.name.toLowerCase().includes(search.toLowerCase())
    ); // Фильтрация по поисковому запросу
  });

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ padding: 3 }}>
      {/* TODO: Заголовки страниц в H1 */}
      <Typography variant="h4" gutterBottom>
        Таблица
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">ID</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Название</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Email</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Сообщение</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>
                    <Link
                      to={`/comment/${row.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography variant="body1" color="primary">
                        {row.name}
                      </Typography>
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
  );
};

export default TableView;
