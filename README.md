<!-- # Obsidian Sample Plugin

This is a sample plugin for Obsidian (https://obsidian.md).

This project uses Typescript to provide type checking and documentation.
The repo depends on the latest plugin API (obsidian.d.ts) in Typescript Definition format, which contains TSDoc comments describing what it does.

**Note:** The Obsidian API is still in early alpha and is subject to change at any time!

This sample plugin demonstrates some of the basic functionality the plugin API can do.
- Adds a ribbon icon, which shows a Notice when clicked.
- Adds a command "Open Sample Modal" which opens a Modal.
- Adds a plugin setting tab to the settings page.
- Registers a global click event and output 'click' to the console.
- Registers a global interval which logs 'setInterval' to the console.

## First time developing plugins?

Quick starting guide for new plugin devs:

- Check if [someone already developed a plugin for what you want](https://obsidian.md/plugins)! There might be an existing plugin similar enough that you can partner up with.
- Make a copy of this repo as a template with the "Use this template" button (login to GitHub if you don't see it).
- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## Adding your plugin to the community plugin list

- Check https://github.com/obsidianmd/obsidian-releases/blob/master/plugin-review.md
- Publish an initial version.
- Make sure you have a `README.md` file in the root of your repo.
- Make a pull request at https://github.com/obsidianmd/obsidian-releases to add your plugin.

## How to use

- Clone this repo.
- Make sure your NodeJS is at least v16 (`node --version`).
- `npm i` or `yarn` to install dependencies.
- `npm run dev` to start compilation in watch mode.

## Manually installing the plugin

- Copy over `main.js`, `styles.css`, `manifest.json` to your vault `VaultFolder/.obsidian/plugins/your-plugin-id/`.

## Improve code quality with eslint (optional)
- [ESLint](https://eslint.org/) is a tool that analyzes your code to quickly find problems. You can run ESLint against your plugin to find common bugs and ways to improve your code.
- To use eslint with this project, make sure to install eslint from terminal:
  - `npm install -g eslint`
- To use eslint to analyze this project use this command:
  - `eslint main.ts`
  - eslint will then create a report with suggestions for code improvement by file and line number.
- If your source code is in a folder, such as `src`, you can use eslint with this command to analyze all files in that folder:
  - `eslint .\src\`

## Funding URL

You can include funding URLs where people who use your plugin can financially support it.

The simple way is to set the `fundingUrl` field to your link in your `manifest.json` file:

```json
{
    "fundingUrl": "https://buymeacoffee.com"
}
```

If you have multiple URLs, you can also do:

```json
{
    "fundingUrl": {
        "Buy Me a Coffee": "https://buymeacoffee.com",
        "GitHub Sponsor": "https://github.com/sponsors",
        "Patreon": "https://www.patreon.com/"
    }
}
```

## API Documentation

See https://github.com/obsidianmd/obsidian-api -->

# Split Diff

Hello! Welcome to Split Diff. This has virtually no written code yet, and is a simple description of what the project will be.

## Inspiration

In my note-taking, I have always wanted some way of showing the change of code from before to after.

The ways I've tried doing this is in the past are:
- embedding a video,
- adding screenshots,
- using `diff` code blocks:

```diff
public function example() {
++ This is new
-- This is old
}
```

Videos are great, but require capturing, user interaction to "play", and don't provide both the before and after simultaneously.
Screenshots are great as well, but can only be displayed top-to-bottom.
Both forms of media don't support adding comments after the fact, and both forms clog up your Obsidian Vault with a new individual file per media object.

The diff code block is a much closer solution to the tool I want, but only displays from top-to-bottom; this is great, but is less intuitive (to me) when scanning.

Moreover, diff becomes the "language" of the code-block, and there is no way to see the original language's syntax highlighting that you'd want within the code block.

An intuitive code presentation for showing a "before and after" is GitHub's split view--this features shows the code before and after, from left to right.

![A git diff example](./public/photos/git_diff_example.png)

This will be a model of the presentation this feature seeks to provide, with the additional code syntax highlighting for both before and after.

So in essence:

A code diff display that presents two side-by-side code blocks, each retaining its native syntax highlighting, and clearly highlights any differences between them.

## Disclaimer & Acknowledgement:
This project is an independent work, not officially affiliated with or endorsed by Obsidian.

Any content, features, or functionality originating from Obsidian should be credited appropriately, and any associated licenses should be observed and followed.

## Potential Issues
What if the window is too small for Left -> Right comparison?
- Since it's mostly up to the user and built for desktop, this is somewhat negligable, but having some sort of default action for this situation would be good.
- Most likely, we would wrap the second code block onto the next line, or return it to a top-bottom diff view.

## Other Ideas
In the context of taking notes for a course, there are often many iterations from starting to finishing one code block or file.
It would be cool to have an almost "slideshow" like diff, where a user would be presented with the diff between code_block_version 1 and 2, but be able to
navigate on to the diff of 2 to 3, 3 to 4, etc.

This is beyond the scope of what this plugin seeks to accomplish, but seems like it would be useful.
