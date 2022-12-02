import React from 'react'
import { useParams } from 'react-router-dom';
import { getUser } from '../../services/home.service';
// import { getUserHomePage } from ''


function HomePage() {
  const [user, setUser] = React.useState(null);
  const { handle } = useParams()

  React.useEffect(() => {
    let mounted = true;
    getUser(handle)
    .then(user => {
      if (mounted) {
        setUser(user)
      }
    })
    return () => mounted = false;
  })


  return (
    <div>Home</div>
  )
}

export default HomePage