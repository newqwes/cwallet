import { Container, PlayButton, LinkContainer, Link } from './styled';

export const LandingPage = () => {
  return (
    <Container>
      <h1>Welcome to CWAllet.one</h1>
      <p>Engage and earn with our crypto games!</p>
      <PlayButton href="https://t.me/cwallet_one_bot" target="_blank">
        Play Now
      </PlayButton>
      <LinkContainer>
        <Link href="https://t.me/cwallet_one" target="_blank">Telegram Channel</Link>
        <Link href="https://x.com/cwallet_one" target="_blank">x.com</Link>
      </LinkContainer>
      {/*<RoadmapSection>*/}
      {/*  <RoadmapTitle>Roadmap</RoadmapTitle>*/}
      {/*  <RoadmapItem>Jun '24: Quiz Game Launch</RoadmapItem>*/}
      {/*  <RoadmapItem>Jul '24: Leaderboards & Achievements</RoadmapItem>*/}
      {/*  <RoadmapItem>Jul '24: Coin Tinder Game Launch</RoadmapItem>*/}
      {/*  <RoadmapItem>Aug '24: Portfolio Tools Development</RoadmapItem>*/}
      {/*  <RoadmapItem>Aug '24: TON Blockchain Integration</RoadmapItem>*/}
      {/*  <RoadmapItem>Aug '24: Social Features Expansion</RoadmapItem>*/}
      {/*</RoadmapSection>*/}
    </Container>
  );
};
