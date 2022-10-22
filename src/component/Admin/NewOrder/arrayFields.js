const Fields = {
  order_no: '',
  previous_order: '',
  discount: '',
  advanced: '',
  due: '',
  transport_charge: '',
  order_date: '',
  delivery_date: '',
  order_number: '',
  order_status: '',
  order_items: [
    {
      products: [],
      price: '',
      quantity: 0,
      measurements: [{ msr_id: '', size: '' }],
      designs: [{ group: '', items: [] }],
      order_date: '',
    },
  ],
  delivery_date: '',
  discount: '',
  advanced: '',
  due: '',
};
export default Fields;
