import { Button } from '@mui/material';
export default function Pagination({ loop, disabled, func }) {
  let items = [];
  for (let i = 1; i <= loop; i++) {
    items.push(i);
  }
  return (
    <ul style={{ display: 'flex', listStyle: 'none' }}>
      {items.map((item) => (
        <li key={item}>
          <Button disabled={disabled === item} onClick={() => func(item)}>
            {item}
          </Button>
        </li>
      ))}
    </ul>
  );
}
