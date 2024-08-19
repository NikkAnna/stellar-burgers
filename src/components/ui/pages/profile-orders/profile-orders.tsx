import { OrdersList, ProfileMenu } from '@components';

import { FC } from 'react';
import { Preloader } from '@ui';
import { ProfileOrdersUIProps } from './type';
import { isUserLoadingSelector } from '../../../../slices/userSlice';
import styles from './profile-orders.module.css';
import { useSelector } from '../../../../services/store';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const loading = useSelector(isUserLoadingSelector);

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    </main>
  );
};
