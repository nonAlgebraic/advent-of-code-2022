const DISK_SIZE = 70000000;
const MIN_UNUSED_SPACE = 30000000;

type File = {
	name: string;
	size: number;
};

type Directory = {
	name: string;
	contents: (File | Directory)[];
	size: number;
	parent?: Directory;
};

type SubDirectory = Directory & {
	parent: Directory;
};

const isDirectory = (item: File | Directory): item is Directory => !!(item as Directory).contents;

export default (input: string) => {
	const [cdToRoot, ...lines] = input.split('\n');

	const root: Directory = {
		name: '/',
		contents: [],
		size: 0,
	};

	let cwd: Directory = root;

	for (const line of lines) {
		if (line === '$ ls') {
			continue;
		} else if (line.startsWith('$ cd ..')) {
			cwd = (cwd as SubDirectory).parent;
		} else if (line.startsWith('$ cd')) {
			cwd = cwd.contents.find(({ name }) => name === line.substring(5)) as Directory;
		} else if (line.startsWith('dir ')) {
			cwd.contents.push({
				name: line.substring(4),
				contents: [],
				parent: cwd,
				size: 0,
			});
		} else {
			const [sizeStr, fileName] = line.split(' ');
			cwd.contents.push({
				name: fileName,
				size: Number(sizeStr),
			});
		}
	}

	const allSubDirs: Directory[] = [];

	const calculateDirSize = (dir: Directory) => {
		dir.contents.forEach(item => {
			if (isDirectory(item)) {
				dir.size += calculateDirSize(item);
			} else {
				dir.size += item.size;
			}
		});

		if (dir !== root) {
			allSubDirs.push(dir);
		}

		return dir.size;
	};

	calculateDirSize(root);

	allSubDirs.sort((a, b) => a.size - b.size);

	const minSpaceToClear = MIN_UNUSED_SPACE - (DISK_SIZE - root.size);

	for (const dir of allSubDirs) {
		if (dir.size >= minSpaceToClear) {
			return dir.size;
		}
	}
};
