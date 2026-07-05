const analyticsQueue = [];

/**
 * Add analytics event to queue
 */
function enqueue(data) {
  analyticsQueue.push(data);
}

/**
 * Remove oldest analytics event
 */
function dequeue() {
  return analyticsQueue.shift();
}

/**
 * Check if queue is empty
 */
function isEmpty() {
  return analyticsQueue.length === 0;
}

module.exports = {
  enqueue,
  dequeue,
  isEmpty,
};