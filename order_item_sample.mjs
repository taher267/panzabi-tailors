export default {
  connection: 'up',
  products: [
    { _id: '634369d07b29b369d879d16c', name: 'পাঞ্জাবী' },
    { _id: '63436a15bc2f663ae3537421', name: 'একছাটা পাঞ্জাবী' },
  ],
  price: 500,
  quantity: 2,
  measurements: [
    { msr_id: '632dafa124866404b3880289', size: '9', label: 'লম্বা' },
    { msr_id: '632dafc024866404b3880291', size: '9', label: 'বডি' },
    {
      msr_id: '632db1c224866404b388029b',
      size: '9',
      label: 'বডির লুজ',
    },
    { msr_id: '632db22424866404b38802a3', size: '9', label: 'পেট' },
    {
      msr_id: '632ea5e0a3a5bd3d881c5648',
      size: '9',
      label: 'পেটের লুজ',
    },
    { msr_id: '638e32d3a3ce0bca86f1097d', size: '9', label: 'ঘের' },
    { msr_id: '632ea651a3a5bd3d881c564f', size: '9', label: 'পুট' },
    { msr_id: '632ea67ca3a5bd3d881c5657', size: '9', label: 'হাতা' },
    {
      msr_id: '632ea691a3a5bd3d881c565c',
      size: '9',
      label: 'হাতার মুহুরী',
    },
    { msr_id: '632ea6afa3a5bd3d881c5664', size: '9', label: 'কলার' },
    {
      msr_id: '634a8185ac37d8ab9e09b8d7',
      size: '9',
      label: 'বোতাম/প্লেট',
    },
    {
      msr_id: '632ede627d322d06d626b8e6',
      size: '9',
      label: 'অতিরিক্ত',
    },
  ],
  designs: [{ group: '63373a972dcb8d4b6d89f233', items: [Array] }],
  user: ['632dacde8ac1f5ca18bc0fd2'],
  order_date: '2022-12-06T00:00:00.000Z',
  _id: '638f8e3e5817c8b7a5a3567e',
};

const temp2 = `<div id='wrapper' style='margin-top:50px'>
<div
  style='width:17%;display:block;float:left;font-size:12.5px;line-height:20px'
>
  <p>&nbsp;</p>
  <p style='display: flex'>একছাটা <input type='checkbox' checked /></p>
  <p style='display: flex'>একছাটা <input type='checkbox' checked /></p>
  <p style='display: flex'>একছাটা <input type='checkbox' checked /></p>
  <p style='display: flex'>একছাটা <input type='checkbox' checked /></p>
</div>
<div style='width:83%;display:inline-block'>
<div style='display:flex;font-size:13.5px'>
    <p style='margin-left:25mm'>নং- {order_no}</p>
    <p style='margin-left:38mm'>তারিখ- {print_date}</p>
  </div>
  <div
    style='display:flex;justify-content:space-between;width:142mm;max-width:100%;padding:0 5px;padding-right:5px; font-size:12.5px'
  >
    <div>
      <div>লম্বা</div>
      <div>&nbsp;</div>
      <div>leng</div>
    </div>
    <div>
      <p>বডি</p>
      <p>বডি</p>
      <p>বডি</p>
      <p>বডি</p>
      <p>বডি</p>
    </div>
    <div>পুট</div>
    <div>
      <div>হাতা</div>
      <div>হাতা</div>
    </div>
    <div>কলার</div>
    <div>
      <div>হাতার মুহরি</div>
      <div>হাতার মুহরি</div>
    </div>
    <div>বুতাম</div>
    <div>বুতাম</div>
  </div>
</div>
</div>`;
