import { Box } from '@mui/material';
import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
} from 'recharts';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchApiPageCard, PageCardSelector } from 'store/reducers/cartoes';

type GraphProps = {
  name: string;
  dia_fatura: number;
  dias: number;
};
const dd = new Date().getDate();
const mm = new Date().getMonth();
const aa = new Date().getFullYear();
const DAY = 24 * 60 * 60 * 1000;
const Graph = () => {
  const dispatch = useAppDispatch();
  const { pageCard } = useAppSelector(PageCardSelector);

  const data: GraphProps[] = [];
  const diaAtual = new Date(aa, mm, dd).getTime();
  const faturaAtraso: GraphProps[] = [];
  pageCard.data.map(card => {
    const dFatura = new Date(aa, mm, card.invoiceClosing).getTime();

    const quantidadeDias = (dFatura - diaAtual) / DAY;

    if (card.limit - card.availableLimit === 0) return null;

    if (quantidadeDias < 0) {
      faturaAtraso.push({
        dias: Math.abs(quantidadeDias),
        dia_fatura: card.invoiceClosing,
        name: card.name,
      });
    }

    return data;
  });

  React.useEffect(() => {
    dispatch(fetchApiPageCard(null));
  }, []);

  return (
    <>
      <Box
        boxShadow={2}
        sx={{
          width: '650px',
          height: '90%',
          padding: '10px',
          marginTop: '25%',
        }}
      >
        <ResponsiveContainer width="99%" height={350}>
          <BarChart
            width={730}
            height={250}
            data={faturaAtraso}
            margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              dataKey="dias"
              label={{
                value: 'Dias de atraso',
                angle: -90,
                position: 'insideLeft',
              }}
            />
            <Tooltip />
            <Legend />

            <Bar dataKey="dias" fill="tomato" />

            <Bar dataKey="dia_fatura" fill="#1c83ee" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
};

export default Graph;
