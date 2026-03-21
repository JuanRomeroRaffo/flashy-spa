import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xpqyerrd");
  
  if (state.succeeded) {
    return (
      <div className="flex-1 w-full text-center">
        <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-6 mb-4">
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-black text-primary tracking-widest px-1">Estado</label>
          <input 
            className="w-full bg-surface-container-high border-none rounded-lg text-on-surface-variant font-bold px-4 py-3 opacity-60" 
            disabled 
            type="text" 
            value="Carabobo"
            name="estado"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-black text-primary tracking-widest px-1">Ciudad</label>
          <input 
            className="w-full bg-surface-container-high border-none rounded-lg text-on-surface-variant font-bold px-4 py-3 opacity-60" 
            disabled 
            type="text" 
            value="Puerto Cabello"
            name="ciudad"
          />
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-black text-primary tracking-widest px-1">Teléfono</label>
        <input 
          className="w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary/30 rounded-lg text-on-surface px-4 py-3 placeholder:text-on-surface-variant/30" 
          placeholder="0412-0000000" 
          type="tel" 
          id="phone" 
          name="telefono"
          required
        />
        <ValidationError 
          prefix="Teléfono" 
          field="telefono"
          errors={state.errors}
        />
      </div>
      <div className="space-y-1">
        <label className="text-[10px] uppercase font-black text-primary tracking-widest px-1">Correo Electrónico</label>
        <input 
          className="w-full bg-surface-container-high border-none focus:ring-2 focus:ring-primary/30 rounded-lg text-on-surface px-4 py-3 placeholder:text-on-surface-variant/30" 
          placeholder="nombre@flashy.com" 
          type="email" 
          id="email" 
          name="email"
          required
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
      </div>
      <button 
        className="w-full mt-4 py-4 bg-[#ff6a00] hover:bg-primary text-on-primary font-headline font-black text-lg uppercase tracking-widest rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed" 
        type="submit"
        disabled={state.submitting}
      >
        {state.submitting ? 'Enviando...' : 'Asegurar mi puesto'}
      </button>
    </form>
  );
}

export default ContactForm;
