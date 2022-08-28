export class ProductsAPIDocs {
  static deleteProductResponse() {
    return {
      description: '상품 게시글 삭제 완료',
      status: 200,
      schema: {
        example: {
          success: true,
        },
      },
    };
  }
  static deleteProductParam() {
    return {
      name: 'product_id',
      example: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
    };
  }
  static deleteProductNotFoundResponse() {
    return {
      description: '찾을 수 없는 게시물',
      schema: {
        example: {
          success: false,
          error: {
            statusCode: 404,
            message: '게시물을 찾을 수 없습니다.',
            error: 'Not Found',
          },
        },
      },
    };
  }
  static deleteProductOperation() {
    return {
      summary: '상품 게시물 삭제',
      description: '상품 게시물을 삭제합니다.',
    };
  }
  static updateProductNotFoundResponse() {
    return {
      description: '찾을 수 없는 게시물',
      schema: {
        example: {
          success: false,
          error: {
            statusCode: 404,
            message: '게시물을 찾을 수 없습니다.',
            error: 'Not Found',
          },
        },
      },
    };
  }
  static updateProductResponse() {
    return {
      description: '상품 수정 완료',
      status: 200,
      schema: {
        example: {
          success: true,
          data: {
            product_id: '5e18cbb1-f0db-4bec-870c-d61f315938c4',
            title: '맥북 팔아요',
            description: '벽돌 보내드릴게요',
            price: 50000,
            status: true,
            createdat: '2022-08-27T02:13:05.826Z',
            category: '3',
            user_id: '79895177-0628-4d07-a164-c05dae857cc3',
            email: 'sseastory624@gmail.com',
            password:
              '$2a$10$3bSQCBRIjFoyoMaDCmU9b.zGsCTnjEixEK09TjpjQfm78NgNfF2sW',
            nickname: 'sgyomdyung',
            imgurl:
              'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
            role: 'USER',
          },
        },
      },
    };
  }
  static updateProductParam() {
    return {
      name: 'product_id',
      example: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
    };
  }
  static updateProductOperation() {
    return {
      summary: '상품 정보 수정',
      description: '상품 정보들을 수정합니다.',
    };
  }
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

  static getAllProductsOperation() {
    return {
      summary: '상품 목록 조회',
      description: '게시물들의 간단한 정보들을 가져옵니다.',
    };
  }

  static getAllProductsResponse() {
    return {
      description: '상품 목록들의 정보들을 배열의 형태로 가져옵니다',
      status: 200,
      schema: {
        example: {
          success: true,
          data: [
            {
              product_product_id: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
              product_title: '벽돌 팔아요',
              product_description:
                '벽돌 싸게 팝니다. 네고 사절 쿨 거래시 택배비 부담해드림.',
              product_price: 50000,
              product_status: true,
              product_createdAt: '2022-08-24T04:36:10.400Z',
              product_category: '3',
              product_userId: 'd074558e-6b09-4d57-8762-e7855f76aaa5',
              user_id: 'd074558e-6b09-4d57-8762-e7855f76aaa5',
              user_email: 'seastory624@gmail.com',
              user_password:
                '$2a$10$jESdHVglSjGm9lSzYeehFe8H1PuSpsgGn/RK5giYYKpXnDdVUKfFa',
              user_nickname: 'gyomdyung',
              user_imgUrl:
                'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
              user_createdAt: '2022-08-24T02:47:48.975Z',
              user_role: 'USER',
            },
          ],
        },
      },
    };
  }

  static getProductParam() {
    return {
      name: 'product_id',
      example: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
    };
  }

  static getProductOperation() {
    return {
      summary: '특정 상품 가져오기',
      description: '상품 정보를 자세하게 가져옵니다.',
    };
  }

  static getProductResponse() {
    return {
      description: '특정 정보 - (필요없는 데이터들 수정 예정)',
      status: 200,
      schema: {
        example: {
          success: true,
          data: {
            product_product_id: 'eafd837d-9d2e-439f-90d2-e0160e6bd2f3',
            product_title: '벽돌 팔아요',
            product_description:
              '벽돌 싸게 팝니다. 네고 사절 쿨 거래시 택배비 부담해드림.',
            product_price: 50000,
            product_status: true,
            product_createdAt: '2022-08-24T04:36:10.400Z',
            product_category: '3',
            product_userId: 'd074558e-6b09-4d57-8762-e7855f76aaa5',
            user_id: 'd074558e-6b09-4d57-8762-e7855f76aaa5',
            user_email: 'seastory624@gmail.com',
            user_password: '비번 포함 쓸모 없는 정보들은 지울 예정입니다 ^^',
            user_nickname: 'gyomdyung',
            user_imgUrl:
              'http://itimg.chosun.com/sitedata/image/202102/09/2021020902484_0.jpg',
            user_createdAt: '2022-08-24T02:47:48.975Z',
            user_role: 'USER',
          },
        },
      },
    };
  }

  static getProductUnauthorizedResponse() {
    return {
      description: '유효성 오류로 인한 실패',
      schema: {
        example: {
          success: false,
          error: {
            statusCode: 401,
            message: '로그인 후 이용할 수 있습니다.',
            error: 'Unauthorized',
          },
        },
      },
    };
  }
}
