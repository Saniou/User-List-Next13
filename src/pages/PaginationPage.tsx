import { useRouter } from 'next/router';
import HomePage from './HomePage'

const PaginationPage = () => {
  const router = useRouter();
  return (
    <div>
    <HomePage/>
    </div>
  );
};

export default PaginationPage;