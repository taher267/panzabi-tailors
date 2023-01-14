### warning

1.0 main/first div must be wrap id='singleSlipPrintwrapper'

1. use div propertise in single quote
<div style='color:#red'>a</div> 👍
<div style="color:#red">a</div> 👎
2. tempate design a single line (remove enter,) like <div><h1>a</h1><span>b</span></div> 👍

not like this 👎 😠

<div> 
    <h1>a</h1>
    <span>b</span>
 </div>

3. write our variables write double curly bracket like {{placename}}

<div id='singleSlipPrintwrapper' style='margin-top:50px'><div style='width:10%;display:block;float:left;font-size:12.5px;line-height:20px' ><p>&nbsp;</p>{{all_product_place}}</div><div style='width:83%;display:inline-block'><div style='display:flex;font-size:13.5px'><p style='margin-left:25mm'>নং- {{order_no}}</p><p style='margin-left:38mm'>তারিখ- {{order_date}}</p></div><div style='display:flex;justify-content:space-between;width:142mm;max-width:100%;padding:0 5px; font-size:12.5px' ><div><div>{{লম্বা}}</div><div>&nbsp;</div><div>{plate_length}</div></div><div><p>{{বডি}}</p></div><div>{{পুট}}</div><div><div>{{হাতা}}</div><div></div></div><div>{{কলার}}</div><div><div>{{হাতার মুহরি}}</div><div></div></div><div>{{বুতাম}}</div><div></div></div></div></div>
