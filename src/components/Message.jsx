export default function Message({ author, body, date}) {
  return (
    <div>
      <h2 style={{ fontSize: '12px', margin: 2, color: "gray"}}><strong>{author}</strong> {date}</h2>
      <div style={{ backgroundColor: "lightblue", borderRadius: '4px', padding: '8px', maxWidth: '200px', marginBottom: '32px'}}>{body}</div>
    </div>
  )
}