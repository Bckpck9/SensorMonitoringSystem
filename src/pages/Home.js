import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = 'api';

const Home = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    async function loadSensors() {
      try {
        const response = await axios.get(`${API}/sensors`);
        setSensors(response.data);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
    }

    loadSensors();
  }, []);

  async function deleteSensor(id) {
    try {
      await axios.delete(`${API}/sensors/${id}`);
      setSensors(prev => prev.filter(s => String(s.id) !== String(id)));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  }

  return (
    <div>
      <h1>Список датчиков</h1>

      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {sensors.map(sensor => (
            <tr key={sensor.id}>
              <td>{sensor.name || '(без названия)'}</td>

              <td>{sensor.alarm ? 'ТРЕВОГА' : 'норма'}</td>

              <td>
                <Link to={`/detail/${sensor.id}`}>Посмотреть</Link>{' '}
                <button onClick={() => deleteSensor(sensor.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <Link to="/add">Добавить датчик</Link>
      </div>
    </div>
  );
};

export default Home;
