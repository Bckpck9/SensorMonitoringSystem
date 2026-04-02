import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = '/api';

const Home = () => {
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const loadSensors = async () => {
      try {
        const { data } = await axios.get(`${API}/sensors`);
        setSensors(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Ошибка запроса:', error);
      }
    };

    loadSensors();
  }, []);

  const deleteSensor = async (id) => {
    try {
      await axios.delete(`${API}/sensors/${id}`);
      setSensors((prev) => prev.filter((s) => String(s.id) !== String(id)));
    } catch (error) {
      console.error('Ошибка удаления:', error);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="card">
          <h1 className="page-title">Список датчиков</h1>

          <table className="data-table">
            <thead>
              <tr>
                <th>Название</th>
                <th>Место</th>
                <th>Значение</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>

            <tbody>
              {sensors.length > 0 ? (
                sensors.map((sensor) => (
                  <tr key={sensor.id}>
                    <td>{sensor.name || '(без названия)'}</td>
                    <td>{sensor.place || '-'}</td>
                    <td>{sensor.value}</td>
                    <td>
                      <span className={`badge ${sensor.alarm ? 'badge-alarm' : 'badge-normal'}`}>
                        {sensor.alarm ? 'Тревога' : 'Норма'}
                      </span>
                    </td>
                    <td className="actions">
                      <div className="actions-inline">
                        <Link className="btn-link" to={`/detail/${sensor.id}`}>
                          Посмотреть
                        </Link>

                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={() => deleteSensor(sensor.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-text">
                    Нет датчиков
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="bottom-actions">
            <Link className="btn-link" to="/add">
              Добавить датчик
            </Link>

            <Link className="btn-link" to="/incidents">
              Все инциденты
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
