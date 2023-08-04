const graph = {};

function addRelation() {
  const parentInput = document.getElementById('parent');
  const childInput = document.getElementById('child');
  const parent = parentInput.value.trim();
  const child = childInput.value.trim();

  if (parent && child) {
    if (!graph[parent]) {
      graph[parent] = [];
    }
    graph[parent].push(child);
    parentInput.value = '';
    childInput.value = '';
  }
}

function topologicalSort() {
  const result = [];
  const visited = new Set();
  const stack = new Set();

  function dfs(node) {
    if (stack.has(node)) {
      throw new Error('Graph contains a cycle. Topological sort is not possible.');
    }

    if (!visited.has(node)) {
      stack.add(node);
      const neighbors = graph[node] || [];
      for (const neighbor of neighbors) {
        dfs(neighbor);
      }
      stack.delete(node);
      visited.add(node);
      result.unshift(node);
    }
  }

  for (const node in graph) {
    if (!visited.has(node)) {
      dfs(node);
    }
  }

  return result;
}

function displayTopologicalOrder(order) {
  const resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = `Topological Sorting Order: ${order.join(' -> ')}`;
}

function performTopologicalSort() {
  try {
    const sortedOrder = topologicalSort();
    displayTopologicalOrder(sortedOrder);
  } catch (error) {
    alert(error.message);
  }
}
