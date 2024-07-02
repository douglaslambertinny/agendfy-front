import styles from "./page.module.css";
import { DatePicker, Button} from 'antd';

export default function Home() {
  return (
    <main className={styles.main}>
      <DatePicker />
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
    </main>
  );
}
