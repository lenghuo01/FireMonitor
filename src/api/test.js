
import io from 'socket.io-client'
// 与Flask Socket.IO服务器连接的URL
const serverURL = 'http://127.0.0.1:5000/dcenter';

// 连接到服务器
const socket = io.connect(serverURL, {
  transports: ['websocket'] // 明确指定使用websocket传输以避免一些兼容性问题
});

// 监听连接成功事件
socket.on('connect', () => {
  console.log('Connected to server.');

  // 发送一个自定义事件到服务器
  socket.emit('my_event', { data: 'Hello from Node.js client!' });
});

// 监听服务器的响应事件
socket.on('my_response', (data) => {
  console.log('Server responded:', data);
});

// 监听断开连接事件
socket.on('disconnect', () => {
  console.log('Disconnected from server.');
});
