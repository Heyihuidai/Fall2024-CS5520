export default function GoalUsers() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      async function fetchUsers() {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
  
      fetchUsers();
    }, []);
  
    return (
      <View style={styles.container}>
        <FlatList
          data={users}
          renderItem={({ item }) => <Text>{item.name}</Text>}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }