import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';
import { stripe } from '../../lib/stripe';
import { GetStaticPaths, GetStaticProps } from 'next';
import Stripe from 'stripe';
import Image from 'next/future/image';
import { useRouter } from 'next/router';

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string;
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  // const { isFallback } = useRouter()

  // if (isFallback) {
  //   return <p>Loading...</p>
  // }
  function handleBuyProduct() {
    console.log(product.defaultPriceId)
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Buscar os produtos mais vendidos ou mais acessados

    return {
      paths: [
        { params: { id: 'prod_QOyjVWHUm0Dvqv' }}
      ],
      //fallback: true,
      fallback: 'blocking', //Não precisaria do isFallBack
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, //salvar a página 1 hora no cache
  }
}