import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Based on the Bible',
    Svg: require('@site/static/img/bible-svgrepo-com.svg').default,
    description: (
      <>
        Build up to a deeper understanding of the Bible and its teachings.
      </>
    ),
  },
  {
    title: 'A place for Christians',
    Svg: require('@site/static/img/20892209_Sandy_Ppl-26_Single-07.svg').default,
    description: (
      <>
        A platform for Christians to find others and learn from the Bible.
      </>
    ),
  },
  {
    title: 'Learn Together',
    Svg: require('@site/static/img/11663777_20944601.svg').default,
    description: (
      <>
        Collaborate with others to explore the Bible and grow in faith.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
