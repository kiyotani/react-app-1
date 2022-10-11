import React, { Component } from 'react';
import * as wijmo from '@grapecity/wijmo';
import Box from '@mui/material/Box';

const CalendarApp = () => {
  return <Calendar />
}

class Calendar extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      start : null,
      end : null,
      calendar : [],
      month: null,
    }
  }
  componentDidMount() {
    let start = new Date();
    start.setDate(1);  // 月初めの日付
    let end = new Date();
    end.setDate(1);
    end.setMonth(end.getMonth() + 1);
    end.setDate(0);  // 月終わりの日付

    this.setState({ start : start });
    this.setState({ end : end });
    const calendar = [];
    this.setState({ month : start.getFullYear() + '年' + (start.getMonth()%12+1) + '月'});

    // 曜日合わせのループ
    [...Array(Number(start.getDay()))].map((_, i) => calendar.push(<Box key={i}></Box>));

    // 日付のループ
    while(start <= end) {
      calendar.push(<Box
        sx={{
          aspectRatio: '1 / 1',
          '&:hover': {
            backgroundColor: 'orange',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
        key={(this.state.month + start.getDate())}
        >{start.getDate()}</Box>);
      start.setDate(start.getDate() + 1);
    }
    this.setState({ calendar : calendar });
  }

  render()
  {
    return (
      <div>
        <Box sx={{
          width: '100%',
          textAlign: 'center',
        }}>{this.state.month}</Box>
        <Box sx={{
          width: '100%',
          display: 'grid',
          gridAutoFlow: 'row',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0,
        }}>
          <Box sx={{ textAlign: 'center', color: '#f00' }}>日</Box>
          <Box sx={{ textAlign: 'center' }}>月</Box>
          <Box sx={{ textAlign: 'center' }}>火</Box>
          <Box sx={{ textAlign: 'center' }}>水</Box>
          <Box sx={{ textAlign: 'center' }}>木</Box>
          <Box sx={{ textAlign: 'center' }}>金</Box>
          <Box sx={{ textAlign: 'center', color: '#00f' }}>土</Box>
          {this.state.calendar}
        </Box>
      </div>
    );
  }
}
export default CalendarApp;
