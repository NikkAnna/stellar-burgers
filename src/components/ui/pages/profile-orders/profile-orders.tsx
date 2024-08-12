import { OrdersList, ProfileMenu } from '@components';

import { FC } from 'react';
import { ProfileOrdersUIProps } from './type';
import styles from './profile-orders.module.css';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      <OrdersList orders={orders} />
    </div>
  </main>
);
