import styled from "styled-components";

export const HomePageGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
`;

export const ItemStyles = styled.div`
  text-align: center;
  position: relative;
  img {
    height: auto;
  }
  p {
    transform: rotate(-2deg);
    position: absolute;
    width: 100%;
    top: -28px;
    left: 0;
  }
  .mark {
    display: inline;
  }
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img.loading {
    --shine: white;
    --background: var(--grey);
    background-image: linear-gradient(
      90deg,
      var(--background) 0px,
      var(--shine) 40px,
      var(--background) 80px
    );
    background-size: 500px;
    animation: shine 1s infinite linear;
  }

  .tilt {
    transform: rotate(2deg);
    position: relative;
    display: inline-block;
  }
`;
