self.__uv$config = {
    prefix: '/search/',
    bare:'https://v5.3kh0.net/bare/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: './uv/uv.handler.js',
    bundle: './uv/uv.bundle.js',
    config: './uv/uv.config.js',
    sw: './uv/uv.sw.js',
};
