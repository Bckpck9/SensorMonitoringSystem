import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const API = '/api';
const THRESHOLD = 70;

const Form = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === 'edit' || Boolean(id);

  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (!isEdit) return;

    const loadSensor = async () => {
      try {
        const { data } = await axios.get(`${API}/sensors/${id}`);
        setName(data?.name ?? '');
        setPlace(data?.place ?? '');
        setValue(String(data?.value ?? ''));
      } catch (error) {
        console.error('Ошибка загрузки для редактирования:', error);
      }
    };

    loadSensor();
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const valueNumber = Number(value);
    const alarm = valueNumber >= THRESHOLD;
    const payload = { name, place, value: valueNumber, alarm };

    try {
      if (isEdit) {
        await axios.put(`${API}/sensors/${id}`, payload);
      } else {
        await axios.post(`${API}/sensors`, payload);
      }
      navigate('/');
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  };

  const alarmPreview = Number(value) >= THRESHOLD;

  return (
    <div className="page">
      <div className="container">
        <div className="form-card">
          <h1 className="page-title">{isEdit ? 'Редактирование датчика' : 'Добавление датчика'}</h1>

          <p className="helper-text">
            Статус автоматически рассчитывается по значению датчика:{' '}
            <span className={`badge ${alarmPreview ? 'badge-alarm' : 'badge-normal'}`}>
              {alarmPreview ? 'Тревога' : 'Норма'}
            </span>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Название</label>
                <input
                  id="name"
                  className="input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="place">Место</label>
                <input
                  id="place"
                  className="input"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="value">Значение</label>
                <input
                  id="value"
                  className="input"
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-actions">

              <Link className="btn-link" to="/">
                Назад
              </Link>
              
              <button className="btn" type="submit">
                Сохранить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
