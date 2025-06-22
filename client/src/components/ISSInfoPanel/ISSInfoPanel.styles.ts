import styled from '@emotion/styled'

export const Panel = styled.div`
  position: absolute;
  bottom: 24px;
  right: 24px;

  background: #1e1e1e;
  color: #f0f0f0;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);
  font-family: 'Segoe UI', sans-serif;
  max-width: 320px;

  z-index: 405;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`
