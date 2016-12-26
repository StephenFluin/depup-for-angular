# What is depup for Angular?
I maintain a lot of Angular applications, and I really like to keep them up to date.

This is a tool I created primarily for myself to help me move more quickly between versions of Angular.

# How do I install it?

```bash
npm install -g depup
```

# How do I use it?
Install and update to the default "latest" according to **depup**:

```bash
depup
```

You can also specify a version (as more are released / become available):

```bash
depup -d 2.4.1
```

# Someday what might it become?
Maybe someday it will detect which dependencies you may not really need, and not install them.

Maybe someday it will help you make changes to your application when moving between versions.