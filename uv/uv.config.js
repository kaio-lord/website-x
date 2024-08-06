self.__uv$config = {
    prefix: '/search/',
    bare:'https://mighty-katerina-user-window-s-34d4600e.koyeb.app/bare/', // Bare server by Realm Services based on Metallic.
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: './uv/uv.handler.js',
    bundle: './uv/uv.bundle.js',
    config: './uv/uv.config.js',
    sw: './uv/uv.sw.js',
};
