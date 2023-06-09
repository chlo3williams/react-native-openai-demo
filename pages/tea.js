import Head from 'next/head';
import React from 'react';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [calMin, setCalMin] = useState(400);
  const [calMax, setCalMax] = useState(600);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (loading) {
      return;
    }
    setLoading(true);
    setResult('');
    const response = await fetch('/api/generate-tea', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ calMin, calMax }),
    });
    const data = await response.json();
    setResult(data.result.replaceAll('\\n', '<br />'));
    setLoading(false);
  }

  return (
    <div>
      <Head>
        <title>Meal Idea Generator</title>
        <link rel="icon" href="/dinner.png" />
      </Head>

      <main className={styles.main}>
        <h3>Meal Idea Generator</h3>
        <img src="/dinner.png" className={styles.dinnerIcon} />
        <form onSubmit={onSubmit}>
        <label>Calories from</label>
          <input
            type="number"
            min={1}
            name="calMin"
            placeholder="Enter the minimum calories"
            value={calMin}
            onChange={(e) => setCalMin(Number.parseInt(e.target.value))}
          />

        <label>Calories to</label>
          <input
            type="number"
            min={1}
            name="calMax"
            placeholder="Enter the maximum calories"
            value={calMax}
            onChange={(e) => setCalMax(Number.parseInt(e.target.value))}
          />
          <input type="submit" value="Generate meal ideas" />
        </form>
        {loading && (
          <div>
            <h3>Looking for meal ideas...</h3>
            <img src="/loading.webp" className={styles.loading} />
          </div>
        )}
        <div
          className={styles.result}
          dangerouslySetInnerHTML={{ __html: result }}
        />
      </main>
    </div>
  );
}