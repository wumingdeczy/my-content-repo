const GITHUB_TOKEN = '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'; // 替换为你的 GitHub PAT
const REPO_OWNER = 'wumingdeczy'; // 替换为你的 GitHub 用户名
const REPO_NAME = 'my-content-repo'; // 替换为你的仓库名
const FILE_PATH = 'content.txt'; // 文件路径

async function saveToGitHub(content) {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const message = 'Update content via website A';
    const contentBase64 = btoa(unescape(encodeURIComponent(content)));

    try {
        // 获取文件的 SHA（如果是更新文件）
        const getResponse = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            },
        });
        console.log('Get file response:', getResponse);
        const getData = await getResponse.json();
        console.log('Get file data:', getData);
        const sha = getData.sha;

        // 更新文件内容
        const putResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: message,
                content: contentBase64,
                sha: sha,
            }),
        });
        console.log('Put file response:', putResponse);
        const putData = await putResponse.json();
        console.log('Put file data:', putData);

        if (putResponse.ok) {
            document.getElementById('status').innerText = '内容已保存到 GitHub！';
        } else {
            document.getElementById('status').innerText = '保存失败，请检查控制台。';
        }
    } catch (error) {
        document.getElementById('status').innerText = '保存失败，请检查控制台。';
        console.error('保存失败：', error);
    }
}

document.getElementById('save-button').addEventListener('click', () => {
    const content = document.getElementById('content-input').value;
    if (content) {
        saveToGitHub(content);
    } else {
        alert('请输入内容！');
    }
});
