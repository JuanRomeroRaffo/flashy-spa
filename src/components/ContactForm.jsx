import React, { useState } from 'react';

function InterestCard({ value, label, icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
        ${selected
          ? 'border-primary bg-primary/10 text-primary shadow-lg shadow-primary/20 scale-[1.02]'
          : 'border-outline-variant/20 bg-surface-container-high text-on-surface-variant hover:border-primary/40 hover:bg-surface-container-highest'
        }`}
    >
      <span className={`material-symbols-outlined text-4xl transition-all ${selected ? 'text-primary' : 'text-on-surface-variant'}`}>
        {icon}
      </span>
      <span className="font-headline font-bold text-sm uppercase tracking-wider">{label}</span>
      {selected && (
        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />
      )}
    </button>
  );
}

function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState('');

  const inputClass = "w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary/30 rounded-lg text-on-surface px-4 py-3 placeholder:text-on-surface-variant/30 outline-none transition-all";
  const labelClass = "text-[10px] uppercase font-black text-primary tracking-widest px-1";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!interest) {
      setError('Por favor selecciona tu tipo de interés.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, interest }),
      });
      if (!res.ok) throw new Error('Error al enviar');
      setSucceeded(true);
    } catch {
      setError('Hubo un problema al enviar. Por favor intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  }

  if (succeeded) {
    return (
      <div className="flex-1 w-full text-center">
        <div className="bg-green-600/20 border border-green-600/50 rounded-xl p-6 mb-4">
          <div className="text-green-400 text-2xl mb-2">✓</div>
          <h3 className="text-green-400 font-headline font-bold text-lg mb-2">¡Registrado con éxito!</h3>
          <p className="text-green-300 text-sm">Gracias por unirte a nuestra lista de espera exclusiva.</p>
        </div>
        <p className="text-on-surface-variant text-sm">
          Te contactaremos pronto con detalles sobre tu acceso prioritario y descuento del 50%.
        </p>
      </div>
    );
  }

  return (
    <form className="flex-1 w-full space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1">
        <label className={labelClass}>Nombre</label>
        <input
          className={inputClass}
          placeholder="Tu nombre completo"
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Teléfono</label>
        <input
          className={inputClass}
          placeholder="0412-0000000"
          type="tel"
          name="phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="space-y-1">
        <label className={labelClass}>Correo Electrónico</label>
        <input
          className={inputClass}
          placeholder="nombre@flashy.com"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <label className={labelClass}>Me interesa como</label>
        <div className="grid grid-cols-2 gap-3">
          <InterestCard
            value="Pasajero"
            label="Pasajero"
            icon="directions_walk"
            selected={interest === 'Pasajero'}
            onClick={setInterest}
          />
          <InterestCard
            value="Motorizado"
            label="Motorizado"
            icon="two_wheeler"
            selected={interest === 'Motorizado'}
            onClick={setInterest}
          />
        </div>
      </div>

      {error && (
        <p className="text-error text-sm px-1">{error}</p>
      )}

      <button
        className="w-full mt-4 py-4 bg-[#ff6a00] hover:bg-primary text-on-primary font-headline font-black text-lg uppercase tracking-widest rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={submitting || !interest}
      >
        {submitting ? 'Enviando...' : 'Asegurar mi puesto'}
      </button>
    </form>
  );
}

export default ContactForm;
