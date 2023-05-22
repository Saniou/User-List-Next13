import { useRouter } from 'next/router';
import HomePage from './HomePage'

const PaginationPage = () => {
  const router = useRouter();
  const { limit, skip } = router.query;
  return (
    <div>
    <HomePage limit={limit} skip={skip} />
    </div>
  );
};

export default PaginationPage;