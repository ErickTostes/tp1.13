import React, { useState } from 'react';

function CustomOrderForm() {
  const [productType, setProductType] = useState('');
  const [productName, setProductName] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [comments, setComments] = useState('');
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
    // Reset fields when product type changes
    setSize('');
    setColor('');
    setModel('');
    setComments('');
    setErrors({});
    setSuccessMessage('');
  };

  const handleDeliveryOptionChange = (event) => {
    const value = event.target.value;
    setDeliveryOptions((prevOptions) =>
      prevOptions.includes(value)
        ? prevOptions.filter((option) => option !== value)
        : [...prevOptions, value]
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      setSuccessMessage('Pedido enviado com sucesso!');
      // Aqui você pode processar os dados do pedido
      console.log({
        productType,
        productName,
        size,
        color,
        model,
        deliveryOptions,
        comments,
      });
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!productName) validationErrors.productName = 'Nome do Produto é obrigatório.';
    if (productType === 'Roupas') {
      if (!size) validationErrors.size = 'Tamanho é obrigatório.';
      if (!color) validationErrors.color = 'Cor é obrigatória.';
    } else if (productType === 'Eletrônicos') {
      if (!model) validationErrors.model = 'Modelo é obrigatório.';
    } else if (productType === 'Móveis') {
      if (!comments) validationErrors.comments = 'Comentários Adicionais são obrigatórios.';
    }
    return validationErrors;
  };

  const resetForm = () => {
    setProductType('');
    setProductName('');
    setSize('');
    setColor('');
    setModel('');
    setDeliveryOptions([]);
    setComments('');
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="custom-order-form">
      <h2>Formulário de Pedido Personalizado</h2>

      <div>
        <label>
          Tipo de Produto:
          <select value={productType} onChange={handleProductTypeChange} required>
            <option value="">Selecione...</option>
            <option value="Roupas">Roupas</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Móveis">Móveis</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          Nome do Produto:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          {errors.productName && <span className="error">{errors.productName}</span>}
        </label>
      </div>

      {productType === 'Roupas' && (
        <div>
          <label>
            Tamanho:
            <select value={size} onChange={(e) => setSize(e.target.value)} required>
              <option value="">Selecione...</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
            </select>
          </label>
          {errors.size && <span className="error">{errors.size}</span>}

          <label>
            Cor:
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
            {errors.color && <span className="error">{errors.color}</span>}
          </label>
        </div>
      )}

      {productType === 'Eletrônicos' && (
        <div>
          <label>
            Modelo:
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
            {errors.model && <span className="error">{errors.model}</span>}
          </label>
        </div>
      )}

      <div>
        <label>
          Opções de Entrega:
          <div>
            <label>
              <input
                type="checkbox"
                value="Entrega Rápida"
                checked={deliveryOptions.includes('Entrega Rápida')}
                onChange={handleDeliveryOptionChange}
              />
              Entrega Rápida
            </label>
            <label>
              <input
                type="checkbox"
                value="Entrega Normal"
                checked={deliveryOptions.includes('Entrega Normal')}
                onChange={handleDeliveryOptionChange}
              />
              Entrega Normal
            </label>
          </div>
        </label>
      </div>

      {productType === 'Móveis' && (
        <div>
          <label>
            Comentários Adicionais:
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              required
            />
            {errors.comments && <span className="error">{errors.comments}</span>}
          </label>
        </div>
      )}

      <button type="submit">Enviar Pedido</button>
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
}

export default CustomOrderForm;
