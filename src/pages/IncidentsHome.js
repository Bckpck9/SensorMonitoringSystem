import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const API = '/api';

const IncidentsHome = () => {
  const [incidents, setIncidents] = useState([]);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const sensorId = searchParams.get('sensorId');

  useEffect(() => {
    const loadIncidents = async () => {
      setError('');
      try {
        const url = sensorId
          ? `${API}/incidents?sensorId=${encodeURIComponent(sensorId)}`
          : `${API}/incidents`;

        const { data } = await axios.get(url);

        // <-- защита: если вдруг пришло не array, не даём React упасть
        const arr = Array.isArray(data) ? data : [];
        setIncidents(arr);
      } catch (e) {
        console.error('Ошибка запроса инцидентов:', e);
        setError('Не удалось загрузить инциденты');
        setIncidents([]);
      }
    };

    loadIncidents();
  }, [sensorId]);

  const deleteIncident = async (id) => {
    try {
      await axios.delete(`${API}/incidents/${id}`);
      setIncidents((prev) => prev.filter((x) => String(x.id) !== String(id)));
    } catch (e) {
      console.error('Ошибка удаления инцидента:', e);
      setError('Не удалось удалить инцидент');
    }
  };

  return (
    <div>
      <h1>Инциденты{sensorId ? ` (датчик #${sensorId})` : ''}</h1>

      {error && <div style={{ margin: '12px 0' }}>{error}</div>}

      <table cellPadding="12" cellSpacing="0">
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
              <td style={{ whiteSpace: 'nowrap' }}>
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
