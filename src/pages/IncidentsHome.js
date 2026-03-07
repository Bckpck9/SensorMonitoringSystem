import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API = '/api';

const IncidentsHome = () => {
  const [incidents, setIncidents] = useState([]);
  const [searchParams] = useSearchParams();
  const sensorId = searchParams.get('sensorId');

  useEffect(() => {
    const loadIncidents = async () => {
      try {
        const url = sensorId
          ? `${API}/incidents?sensorId=${encodeURIComponent(sensorId)}`
          : `${API}/incidents`;

        const { data } = await axios.get(url);
        setIncidents(data);
      } catch (error) {
        console.error('Ошибка запроса инцидентов:', error);
      }
    };

    loadIncidents();
  }, [sensorId]);

  const deleteIncident = async (id) => {
    try {
      await axios.delete(`${API}/incidents/${id}`);
      setIncidents((prev) => prev.filter((x) => String(x.id) !== String(id)));
    } catch (error) {
      console.error('Ошибка удаления инцидента:', error);
    }
  };

  return (
    <div>
      <h1>Инциденты{sensorId ? ` (датчик #${sensorId})` : ''}</h1>

      <table cellPadding="12" cellSpacing="0">
        <colgroup>
          <col width="120" />
          <col width="140" />
          <col width="160" />
          <col width="280" />
          <col width="220" />
        </colgroup>

        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">Sensor ID</th>
            <th align="left">Тип</th>
            <th align="left">Время</th>
            <th align="left">Действия</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((inc) => (
            <tr key={inc.id}>
              <td>{inc.id}</td>
              <td>{inc.sensorId}</td>
              <td>{inc.type || '-'}</td>
              <td>{inc.createdAt || '-'}</td>
              <td nowrap="nowrap">
                <Link to={`/incidents/${inc.id}`}>Посмотреть</Link>
                &nbsp;&nbsp;&nbsp;
                <button type="button" onClick={() => deleteIncident(inc.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <Link to="/">Назад</Link>
      <br />
      <Link to="/incidents/add">Добавить инцидент</Link>
    </div>
  );
};

export default IncidentsHome;
