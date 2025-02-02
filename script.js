// 配置
const GITHUB_TOKEN = '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'; // 替换为你的 GitHub PAT
const REPO_OWNER = 'wumingdeczy'; // 替换为你的 GitHub 用户名
const REPO_NAME = 'my-content-repo'; // 替换为你的仓库名
const FILE_PATH = 'content.txt'; // 文件路径

// 保存内容到 GitHub
async function saveToGitHub(content) {
    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;
    const message = 'Update content via website A'; // 提交信息
    const contentBase64 = btoa(unescape(encodeURIComponent(content))); // 将内容编码为 Base64

    try {
        // 获取文件的 SHA（如果是更新文件）
        const getResponse = await fetch(url, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
            },
        });
        const getData = await getResponse.json();
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
                sha: sha, // 如果是更新文件，需要提供文件的 SHA
            }),
        });

        const putData = await putResponse.json();
        if (putResponse.ok) {
            document.getElementById('status').innerText = '内容已保存到 GitHub！';
            console.log('文件已更新：', putData);
        } else {
            document.getElementById('status').innerText = '保存失败，请检查控制台。';
            console.error('保存失败：', putData);
        }
    } catch (error) {
        document.getElementById('status').innerText = '保存失败，请检查控制台。';
        console.error('保存失败：', error);
    }
}

// 绑定保存按钮事件
document.getElementById('save-button').addEventListener('click', () => {
    const content = document.getElementById('content-input').value;
    if (content) {
        saveToGitHub(content);
    } else {
        alert('请输入内容！');
    }
});// JavaScript Document
