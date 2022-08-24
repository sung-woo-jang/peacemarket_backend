export class ProductsAPIDocs {
  static registProductOperation() {
    return {
      summary: '상품 등록',
      description: '판매글을 등록합니다.',
    };
  }

  static registProductCreatedResponse() {
    return {
      description: '상품 등록 완료',
      schema: {
        example: {
          success: true,
          data: {
            title: '벽돌 팔아요',
            description:
              '벽돌 싸게 팝니다. 네고 사절 쿨 거래시 택배비 부담해드림.',
            price: '50000',
            category: 3,
            user: 'd074558e-6b09-4d57-8762-e7855f76aaa5',
            product_id: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
            status: true,
            createdAt: '2022-08-24T04:36:10.400Z',
            images_id: [
              '77be1264-86c8-4363-9259-d4766edeaa43',
              '57a909c8-0718-4912-9d3c-f1cac490a3f8',
            ],
          },
        },
      },
    };
  }
}
