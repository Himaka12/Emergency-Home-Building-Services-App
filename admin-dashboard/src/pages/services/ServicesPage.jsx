import { useEffect, useState } from 'react';
import { createService, getServices } from '../../api/serviceApi.js';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', baseVisitFee: 0 });

  const loadServices = () => {
    getServices()
      .then((response) => setServices(response.data))
      .catch(() => setServices([]));
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createService({
      ...form,
      baseVisitFee: Number(form.baseVisitFee)
    });
    setForm({ name: '', description: '', baseVisitFee: 0 });
    loadServices();
  };

  return (
    <>
      <header className="page-header">
        <h2>Service Categories</h2>
      </header>
      <section className="page-panel">
        <form className="form-stack" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Description
            <input name="description" value={form.description} onChange={handleChange} />
          </label>
          <label>
            Base Visit Fee
            <input
              name="baseVisitFee"
              type="number"
              min="0"
              value={form.baseVisitFee}
              onChange={handleChange}
            />
          </label>
          <button className="button" type="submit">
            Add Service
          </button>
        </form>
      </section>
      <section className="page-panel table-shell">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Visit Fee</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.baseVisitFee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default ServicesPage;
