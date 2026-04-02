import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = '/api';

const IncidentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const loadIncident = async () => {
      try {
        const { data } = await axios.get(`${API}/incidents/${id}`);
        setIncident(data);
      } catch (error) {
        console.error('Ошибка загрузки инцидента:', error);
      }
    };

    loadIncident();
  }, [id]);

  if (!incident) {
    return (
      <div className="page">
        <div className="container">
          <div className="detail-card">
            <h1 className="page-title">Инцидент</h1>
            <p className="helper-text">Загрузка...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="detail-card">
          <h1 className="page-title">Инцидент</h1>

          <table className="info-table">
            <tbody>
              <tr>
                <td>ID</td>
                <td>{incident.id}</td>
              </tr>
              <tr>
                <td>Sensor ID</td>
                <td>{incident.sensorId}</td>
              </tr>
              <tr>
                <td>Тип</td>
                <td>{incident.type}</td>
              </tr>
              <tr>
                <td>Сообщение</td>
                <td>{incident.message}</td>
              </tr>
              <tr>
                <td>Время</td>
                <td>{incident.createdAt}</td>
              </tr>
            </tbody>
          </table>

          <div className="bottom-actions">
            <button className="btn" type="button" onClick={() => navigate(-1)}>
              Назад
            </button>

            <Link className="btn-link" to={`/incidents/edit/${incident.id}`}>
              Изменить
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentDetail;
