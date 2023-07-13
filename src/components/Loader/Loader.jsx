import { RotatingLines } from 'react-loader-spinner';
import './Loader.module.css';

export const Loader = () => {
 return <RotatingLines color="#3f51b5" height={70} width={70} ariaLabel="loading" />;
};