import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const title = searchParams.get('title') ?? 'Bread of Life';
    const verse = searchParams.get('verse') ?? 'A spiritually immersive journey.';
    const type = searchParams.get('type') ?? 'Bread of Life';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0B1437',
            color: '#FFFFFF',
            padding: '80px',
            fontFamily: 'serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              border: '2px solid rgba(201, 168, 76, 0.4)',
              width: '100%',
              height: '100%',
              padding: '60px',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                color: '#C9A84C',
                textTransform: 'uppercase',
                letterSpacing: '8px',
                marginBottom: '40px',
                fontFamily: 'sans-serif'
              }}
            >
              {type}
            </div>
            
            <div
              style={{
                fontSize: '84px',
                fontStyle: 'italic',
                fontWeight: 600,
                color: '#FFFFFF',
                lineHeight: 1.1,
                marginBottom: '40px',
                textShadow: '0 4px 30px rgba(0,0,0,0.5)',
              }}
            >
              "{title}"
            </div>

            <div
              style={{
                fontSize: '36px',
                color: 'rgba(255,255,255,0.7)',
                marginTop: 'auto',
                fontFamily: 'sans-serif'
              }}
            >
              {verse}
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                fontSize: '24px',
                color: '#C9A84C',
                fontFamily: 'sans-serif',
                letterSpacing: '4px',
                textTransform: 'uppercase'
              }}
            >
              Bread of Life
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response('Failed to generate image', { status: 500 });
  }
}
