export type APIResponse<T> = {
  isSuccessStatusCode: true;
  message: '';
  result: T;
  statusCode: 200;
  timestamp: '2023-07-18T06:40:38.393459Z';
};

export type CoursesListResponse = {
  pageSize: number;
  page: number;
  count: number;
  data: Course[];
};

export type Course = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  entityMetadata: {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
  };
  name: string;
  description: string;
  price: number;
  duration: 7;
  pricing: [
    {
      value: number;
      currency: number;
    }
  ];
  image: string;
  publishDate: string;
  status: number;
  internalSku: string;
  licenses: number;
  purchaseOptions: [
    {
      id: string;
      name: string;
      description: string;
      internalSku: string;
      pricing: [
        {
          value: number;
          currency: number;
        }
      ];
      image: string;
      createdAt: string;
      publishDate: string;
      status: number;
      isRecurrent: true;
      recurringFrequency: number;
      nonRecurringExpiry: number;
      hasFreeTrial: true;
      chargeAfter: number;
      shouldInheritPrices: true;
    }
  ];
};
