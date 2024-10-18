export const exitHandler = async (args: { event: string }) => {
  // try { await repository.disconnect(); } catch (err) { }
  // try { server.close(); } catch (err) { }
  // eventHandler.emit('sys-info', 'Shutting down app.');

  console.info('TODO: Close server here');

  process.exit(0);
};
