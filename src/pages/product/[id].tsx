import { useRouter } from 'next/router';
import { ImageContainer, ProductContainer, ProductDetails } from '../../styles/pages/product';

export default function Product() {
  const { query } = useRouter()

  return (
    <ProductContainer>
      <ImageContainer>

      </ImageContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt tempora, voluptatibus magnam velit ipsa harum magni assumenda vitae corporis nulla sapiente, vero corrupti porro alias laudantium tenetur nostrum commodi ut?</p>

        <button>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}