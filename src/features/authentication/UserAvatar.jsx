import styled from "styled-components";
import { useUser } from "./useUser";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";

export default function Avatar() {
  const { data } = useUser();
  const { avatar, fullName } = data.user.user_metadata;

  return (
    <Row>
      <StyledUserAvatar>
        <AvatarImg
          src={avatar || "default-user.jpg"}
          alt={`image of${fullName}`}
        />
      </StyledUserAvatar>

      <Heading as="h3" style={{ fontSize: "1.5rem" }}>
        {fullName}
      </Heading>
    </Row>
  );
}

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const AvatarImg = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;
